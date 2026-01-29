export function insertAtCursor(
  value: string,
  insert: string,
  textarea: HTMLTextAreaElement | null,
): string {
  if (!textarea) return value;

  const start = textarea.selectionStart;
  const end = textarea.selectionEnd;

  return value.slice(0, start) + insert + value.slice(end);
}
