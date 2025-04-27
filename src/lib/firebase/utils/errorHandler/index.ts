export function handleError(error: unknown, customMessage: string) {
  let message = customMessage;

  if (error instanceof Error) {
    message = error.message || customMessage;
  } else {
    console.error('Erro desconhecido:', error);
  }

  console.error(message);
  throw new Error(message);
}
