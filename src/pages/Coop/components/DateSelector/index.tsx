import styles from './DateSelector.module.scss';

interface DateSelectorProps {
  title: string;
  date: { year: number | ''; month: number | ''; day: number | '' };
  setDate: React.Dispatch<React.SetStateAction<{ year: number | ''; month: number | ''; day: number | '' }>>;
}

export default function DateSelector({ title, date, setDate }: DateSelectorProps) {
  const handleDateChange = (field: keyof typeof date, e: React.ChangeEvent<HTMLInputElement>) => {
    setDate((prev) => ({
      ...prev,
      [field]: e.target.valueAsNumber || '',
    }));
  };

  return (
    <div className={styles['date-container']}>
      <div className={styles['date-container__title']}>{title}</div>
      <div className={styles['date-container__input']}>
        <input
          type="number"
          value={date.year}
          onChange={(e) => handleDateChange('year', e)}
          className={styles['date-container__input--year']}
          placeholder="YYYY"
        />
        <span className={styles['date-container__slash']}>/</span>
        <input
          type="number"
          value={date.month}
          onChange={(e) => handleDateChange('month', e)}
          className={styles['date-container__input--month']}
          placeholder="MM"
        />
        <span className={styles['date-container__slash']}>/</span>
        <input
          type="number"
          value={date.day}
          onChange={(e) => handleDateChange('day', e)}
          className={styles['date-container__input--day']}
          placeholder="DD"
        />
      </div>
    </div>
  );
}
