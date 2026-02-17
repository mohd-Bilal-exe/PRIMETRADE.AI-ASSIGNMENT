'use client';

import React, { useState, useEffect, Dispatch, SetStateAction, FormEvent, DragEvent } from 'react';
import { Plus, Trash, Flame, Loader2, ArrowRight, Link, Link2, SquareArrowOutUpRight } from 'lucide-react';
import { motion } from 'framer-motion';
import api from '@/app/lib/services/api';
import { Task } from '@/app/lib/types';


//prebuilt compoennt from hover.dev - https://www.hover.dev/components/boards
export const KanbanBoard = () => {
  return (
    <div className="h-full w-full ">
      <Board />
    </div>
  );
};

const Board = () => {
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await api.get('/tasks');
      const tasks: Task[] = response.data.data.tasks;
      const formattedCards = tasks.map((task) => ({
        id: task.id,
        title: task.title,
        status: task.status,
        description: task.description,
        column: mapStatusToColumn(task.status),
        priority: task.priority,
      }));
      setCards(formattedCards);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
    } finally {
      setLoading(false);
    }
  };

  const mapStatusToColumn = (status: string) => {
    switch (status) {
      case 'pending':
        return 'backlog';
      case 'in-progress':
        return 'doing';
      case 'completed':
        return 'done';
      default:
        return 'backlog';
    }
  };

  const mapColumnToStatus = (column: string) => {
    switch (column) {
      case 'backlog':
        return 'pending';
      case 'doing':
        return 'in-progress';
      case 'done':
        return 'completed';
      default:
        return 'pending';
    }
  };

  if (loading) {
    return (
        <div className="flex h-full w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
    );
  }

  return (
    <div className="flex md:flex-row flex-col justify-between h-full w-full gap-8 overflow-scroll p-12">
      <Column
        title="Backlog"
        column="backlog"
        headingColor="text-neutral-500"
        cards={cards}
        setCards={setCards}
        loadingTasks={loadingTasks}
        setLoadingTasks={setLoadingTasks}
        mapColumnToStatus={mapColumnToStatus}
      />
      <Column
        title="In Progress"
        column="doing"
        headingColor="text-blue-600 dark:text-blue-200"
        cards={cards}
        setCards={setCards}
        loadingTasks={loadingTasks}
        setLoadingTasks={setLoadingTasks}
        mapColumnToStatus={mapColumnToStatus}
      />
      <Column
        title="Completed"
        column="done"
        headingColor="text-emerald-600 dark:text-emerald-200"
        cards={cards}
        setCards={setCards}
        loadingTasks={loadingTasks}
        setLoadingTasks={setLoadingTasks}
        mapColumnToStatus={mapColumnToStatus}
      />
      <BurnBarrel setCards={setCards} />
    </div>
  );
};

type ColumnProps = {
  title: string;
  headingColor: string;
  cards: CardType[];
  column: string;
  setCards: Dispatch<SetStateAction<CardType[]>>;
  loadingTasks: Set<string>;
  setLoadingTasks: Dispatch<SetStateAction<Set<string>>>;
  mapColumnToStatus: (col: string) => string;
};

const Column = ({ title, headingColor, cards, column, setCards, loadingTasks, setLoadingTasks, mapColumnToStatus }: ColumnProps) => {
  const [active, setActive] = useState(false);

  const handleDragStart = (e: DragEvent, card: CardType) => {
    e.dataTransfer.setData('cardId', card.id);
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');

    setActive(false);
    clearHighlights();

    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);

    const before = element.dataset.before || '-1';

    if (before !== cardId) {
      let copy = [...cards];
      let cardToTransfer = copy.find((c) => c.id === cardId);
      
      if (!cardToTransfer) return;
      
      // If changing column, update status
      const oldColumn = cardToTransfer.column;
      const newStatus = mapColumnToStatus(column);

      cardToTransfer = { ...cardToTransfer, column }; // Optimistic update of column

      copy = copy.filter((c) => c.id !== cardId);

      const moveToBack = before === '-1';

      if (moveToBack) {
        copy.push(cardToTransfer);
      } else {
        const insertAtIndex = copy.findIndex((el) => el.id === before);
        if (insertAtIndex === undefined) return;
        copy.splice(insertAtIndex, 0, cardToTransfer);
      }

      setCards(copy); 

      // If column changed, calling API
      if (oldColumn !== column) {
         setLoadingTasks(prev => new Set(prev).add(cardId));
         try {
          
             await api.put(`/tasks/${cardId}`, { status: newStatus, title: cardToTransfer.title });
         } catch (error) {
             console.error("Failed to update task status", error);
             
             alert("Failed to update task. It will revert on refresh.");
         } finally {
             setLoadingTasks(prev => {
                 const newSet = new Set(prev);
                 newSet.delete(cardId);
                 return newSet;
             });
         }
      }
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const clearHighlights = (els?: HTMLElement[]) => {
    const indicators = els || getIndicators();
    indicators.forEach((i) => {
      i.style.opacity = '0';
    });
  };

  const highlightIndicator = (e: DragEvent) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const el = getNearestIndicator(e, indicators);
    el.element.style.opacity = '1';
  };

  const getNearestIndicator = (e: DragEvent, indicators: HTMLElement[]) => {
    const DISTANCE_OFFSET = 50;

    const el = indicators.reduce(
      (closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + DISTANCE_OFFSET);
        if (offset < 0 && offset > closest.offset) {
          return { offset: offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );
    return el;
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`)) as HTMLElement[];
  };

  const handleDragLeave = () => {
    clearHighlights();
    setActive(false);
  };

  const filteredCards = cards.filter((c) => c.column === column);

  return (
    <div className="md:w-[24%] w-[90%] mx-auto shrink-0">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm text-neutral-400">
          {filteredCards.length}
        </span>
      </div>
      <div
        onDrop={handleDragEnd}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`h-full w-full transition-colors ${
          active ? 'bg-neutral-200/50 dark:bg-neutral-800/50' : 'bg-neutral-800/0'
        }`}
      >
        {filteredCards.map((c) => {
          return (
            <Card 
                key={c.id} 
                {...c} 
                handleDragStart={handleDragStart} 
                isLoading={loadingTasks.has(c.id)}
            />
          );
        })}
        <DropIndicator beforeId={null} column={column} />
        <AddCard column={column} setCards={setCards} mapColumnToStatus={mapColumnToStatus} />
      </div>
    </div>
  );
};

type CardProps = CardType & {
  handleDragStart: (e: DragEvent, card: CardType) => void;
  isLoading?: boolean;
};

const Card = ({ title,description, id, column, priority, handleDragStart, isLoading }: CardProps) => {
  return (
    <>
      <DropIndicator beforeId={id} column={column} />
      <motion.div
        layout
        layoutId={id}
        draggable="true"
        onDragStart={(e) => handleDragStart(e as unknown as DragEvent, { title, id, column, priority })}
        className={`relative cursor-grab rounded border p-3 active:cursor-grabbing ${
             isLoading 
             ? 'opacity-50 border-neutral-300 bg-neutral-100 dark:border-neutral-700 dark:bg-neutral-800' 
             : 'border-neutral-200 bg-white dark:border-neutral-700 dark:bg-neutral-800'
        }`}
      >
        {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
                <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
            </div>
        )}
        <button onClick={(e)=>{e.stopPropagation();console.log("tapped")}}   className="absolute top-2 right-2 cursor-pointer"><SquareArrowOutUpRight className='size-4' /></button>
        <h2 className="text-sm text-neutral-900 dark:text-neutral-100">{title}</h2>
        <p   className="text-xs w-full truncate font-light text-neutral-900 dark:text-neutral-50 p-0.5">{description}</p>
        {priority && (
            <div className={`mt-2 capitalize inline-block rounded px-2 py-0.5 text-xs font-medium ${
                priority === 'high' 
                ? 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                : priority === 'medium'
                ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400'
                : 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            }`}>
                {priority}
            </div>
        )}
      </motion.div>
    </>
  );
};

type DropIndicatorProps = {
  beforeId: string | null;
  column: string;
};

const DropIndicator = ({ beforeId, column }: DropIndicatorProps) => {
  return (
    <div
      data-before={beforeId || '-1'}
      data-column={column}
      className="my-0.5 h-0.5 w-full bg-violet-400 opacity-0"
    />
  );
};

const BurnBarrel = ({ setCards }: { setCards: Dispatch<SetStateAction<CardType[]>> }) => {
  const [active, setActive] = useState(false);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
  };

  const handleDragEnd = async (e: DragEvent) => {
    const cardId = e.dataTransfer.getData('cardId');

    // Optimistic Delete
    setCards((pv) => pv.filter((c) => c.id !== cardId));
    setActive(false);

    try {
        await api.delete(`/tasks/${cardId}`);
    } catch (error) {
        console.error("Failed to delete task", error);
        alert("Failed to delete task.");
        // Ideally re-fetch
    }
  };

  return (
    <div
      onDrop={handleDragEnd}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      className={`mt-10 grid h-56 w-56 shrink-0 place-content-center rounded border text-3xl ${
        active
          ? 'border-red-800 bg-red-800/20 text-red-500'
          : 'border-neutral-300 bg-neutral-200/20 text-neutral-400 dark:border-neutral-500 dark:bg-neutral-500/20 dark:text-neutral-500'
      }`}
    >
      {active ? <Flame className="animate-bounce" /> : <Trash />}
    </div>
  );
};

const AddCard = ({ column, setCards, mapColumnToStatus }: { column: string; setCards: Dispatch<SetStateAction<CardType[]>>; mapColumnToStatus: (c: string) => string }) => {
  const [text, setText] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [adding, setAdding] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const tempId = Math.random().toString();
    const status = mapColumnToStatus(column);

    const newCard: CardType = {
      column,
      title: text.trim(),
      description,
      id: tempId,
      priority,
    };

    // Optimistic Add
    setCards((pv) => [...pv, newCard]);
    setAdding(false);
    setText('');

    try {
        const response = await api.post('/tasks', {
            title: text.trim(),
            priority,description,
            status
        });
        
        const createdTask = response.data.data; // Adjust based on actual API response
        
        // Replace temp card with real card (ID update)
        setCards((pv) => pv.map(c => c.id === tempId ? {
            ...c,
            id: createdTask.id,
            column: column // maintain column
        } : c));

    } catch (error) {
        console.error("Failed to create task", error);
        setCards(pv => pv.filter(c => c.id !== tempId)); // Revert
        alert("Failed to create task");
    }
  };

  return (
    <>
      {adding ? (
        <motion.form layout onSubmit={handleSubmit} className='bg-neutral-300/5 p-2 rounded'>
          <input
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Task Title..."
            className="w-full rounded border border-violet-400 bg-violet-400/20 p-3 text-sm text-neutral-900 placeholder-violet-300 focus:outline-0 dark:text-neutral-50 mb-2"
          />
           <textarea
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            className="w-full h-20 rounded border border-violet-400 bg-violet-400/20 p-3 text-xs text-neutral-900 placeholder-violet-300 focus:outline-0 dark:text-neutral-50 bg-neutral-50 dark:bg-neutral-900 resize-none"
          />
          
          <div className="mt-2">
            <label className="block text-xs text-neutral-500 mb-1">Priority</label>
            <select 
                value={priority}
                onChange={(e) => setPriority(e.target.value as any)}
                className="w-full rounded border border-neutral-300 bg-transparent p-2 text-xs text-neutral-900 dark:border-neutral-700 dark:text-neutral-50"
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>
          </div>

          <div className="mt-1.5 flex items-center justify-end gap-1.5">
            <button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50"
            >
              Close
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-neutral-900 px-3 py-1.5 text-xs text-neutral-50 transition-colors hover:bg-neutral-700 dark:bg-neutral-50 dark:text-neutral-950 dark:hover:bg-neutral-300"
            >
              <span>Add</span>
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          onClick={() => setAdding(true)}
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-neutral-400 transition-colors hover:text-neutral-900 dark:hover:text-neutral-50"
        >
          <span>Add a task here</span>
          <Plus className="h-4 w-4" />
        </motion.button>
      )}
    </>
  );
};

type CardType = {
  title: string;
  id: string;
  column: string;
  description?: string;
  priority?: 'low' | 'medium' | 'high';
  status?: string;
};
