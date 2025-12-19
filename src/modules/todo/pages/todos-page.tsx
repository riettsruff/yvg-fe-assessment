import { ListTodo } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useNavigationType } from 'react-router-dom';

import { useI18n } from '@/contexts/locale-context';
import { TodoFilterTabs, TodoForm, TodoList } from '@/modules/todo/components';
import { useTodosPageVM } from '@/modules/todo/hooks';

const TodosPage = () => {
  const { t } = useI18n();
  const navigationType = useNavigationType();
  const [newTask, setNewTask] = useState('');
  const { items, filter, filteredTodos, stats, add, toggle, remove, setFilter } = useTodosPageVM();
  const containerClassName = 'max-w-4xl w-full mx-auto';

  useEffect(() => {
    if (navigationType === 'POP') return;
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'auto' });
    }
  }, [navigationType]);

  const handleAddTodo = (value: string) => {
    add(value);
    setNewTask('');
  };

  const filterOptions = [
    { value: 'all', label: t('todos.filters.all') },
    { value: 'pending', label: t('todos.filters.pending') },
    { value: 'completed', label: t('todos.filters.completed') },
  ] as const;

  return (
    <div className={containerClassName}>
      <header className="mb-8 md:mb-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-3 bg-gradient-to-r from-primary via-foreground to-primary bg-clip-text text-transparent">
          {t('todos.title')}
        </h1>
        <p className="text-muted-foreground text-base md:text-lg">
          {stats.total > 0
            ? t('todos.subtitle', { completed: stats.completed, total: stats.total })
            : t('todos.subtitleEmpty')}
        </p>

        {stats.total > 0 && (
          <div
            className="mt-4"
            role="progressbar"
            aria-valuenow={stats.progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={t('todos.progressLabel', { percent: Math.round(stats.progressPercent) })}
          >
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-primary transition-all duration-500 ease-out rounded-full"
                style={{ width: `${stats.progressPercent}%` }}
              />
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              {t('todos.progressLabel', { percent: Math.round(stats.progressPercent) })}
            </p>
          </div>
        )}
      </header>

      <TodoForm
        value={newTask}
        onChange={setNewTask}
        onSubmit={handleAddTodo}
        placeholder={t('todos.addPlaceholder')}
        buttonLabel={t('todos.addButton')}
        hint={t('todos.addHint')}
      />

      {items.length > 0 && (
        <TodoFilterTabs
          active={filter}
          options={filterOptions.map((opt) => ({ value: opt.value, label: opt.label }))}
          counts={{ total: stats.total, completed: stats.completed, pending: stats.pending }}
          onChange={setFilter}
          label={t('todos.title')}
        />
      )}

      <section
        id="task-list"
        role="tabpanel"
        aria-label={`${t(`todos.filters.${filter}`)} tasks`}
        className="space-y-3"
      >
        <TodoList
          todos={filteredTodos}
          allTodos={items}
          onToggle={toggle}
          onDelete={remove}
          emptyIcon={<ListTodo className="h-10 w-10 text-primary/50" />}
          emptyTitle={items.length === 0 ? t('todos.emptyTitle') : t('todos.emptyFilterTitle')}
          emptyDescription={t('todos.emptyDescription')}
          emptyFilteredDescription={t('todos.emptyFilterDescription', {
            filter: t(`todos.filters.${filter}`),
          })}
          markCompleteLabel={(text) => t('todos.markComplete', { text })}
          markIncompleteLabel={(text) => t('todos.markIncomplete', { text })}
          deleteLabel={(text) => t('todos.deleteAria', { text })}
        />
      </section>

      {items.length > 0 && (
        <p className="text-xs text-muted-foreground text-center mt-8" aria-hidden="true">
          {t('todos.keyboardHint')}
        </p>
      )}
    </div>
  );
};

export default TodosPage;
