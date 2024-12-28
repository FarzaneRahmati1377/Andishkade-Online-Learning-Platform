import { PluginFunc } from 'dayjs';
declare module 'dayjs' {
  interface Dayjs {
    jalali: () => Dayjs;
  }

  function dayjs(date: string | number | Date | null | undefined, options?: { jalali?: boolean }): Dayjs;
  function extend(plugin: PluginFunc, option?: any): Dayjs;
}
