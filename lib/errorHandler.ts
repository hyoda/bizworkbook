export function handleError(error: unknown, setMessage: (msg: string) => void) {
  if (error instanceof Error) {
    setMessage(error.message);
  } else {
    setMessage('알 수 없는 오류가 발생했습니다.');
  }
}
