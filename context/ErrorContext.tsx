import { createContext, useContext, useState } from 'react';

const ErrorContext = createContext<{ message: string; setError: (error: unknown) => void }>({
  message: '',
  setError: () => {},
});

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [message, setMessage] = useState('');

  function setError(error: unknown) {
    if (error instanceof Error) {
      setMessage(error.message);
    } else {
      setMessage('알 수 없는 오류가 발생했습니다.');
    }
  }

  return (
    <ErrorContext.Provider value={{ message, setError }}>
      {children}
      {message && <p className="text-center text-red-500">{message}</p>}
    </ErrorContext.Provider>
  );
}

export function useErrorContext() {
  return useContext(ErrorContext);
}

/** Usage
 * 
    import { useErrorContext } from '@/context/ErrorContext';

    export default function WorkbookDetailPage() {
      const { setError } = useErrorContext();

      useEffect(() => {
        async function fetchWorkbook() {
          try {
            const response = await fetch(`/api/workbooks/${id}`);
            if (!response.ok) throw new Error('워크북을 찾을 수 없습니다.');
            const data = await response.json();
            setWorkbook(data);
          } catch (error) {
            setError(error);
          }
        }
        fetchWorkbook();
      }, [id]);
    }
 * 
 */