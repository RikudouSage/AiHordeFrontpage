export function replaceContext<TSource extends object, TKey extends keyof TSource>(object: TSource, targets: TKey[], contextSubKey?: TKey): TSource {
  const copy = {...object};
  const context = {...(contextSubKey ? copy[contextSubKey] : copy)} as object;

  for (const key of Object.keys(context)) {
    for (const target of targets) {
      if (typeof copy[target] !== 'string') {
        continue;
      }
      copy[target] = (<string>copy[target]).replaceAll(`{${key}}`, context[<keyof typeof context>key] as string) as any;
    }
  }

  return copy;
}
