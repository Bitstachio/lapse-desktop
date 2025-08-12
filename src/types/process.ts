export type TProcessState = "running" | "paused" | "timeout" | "inactive";

export interface IInterval {
  startTime: Date;
  targetDuration: number;
  prevSessionsDuration: number;
  remainingDuration: number;
}

export interface IProcess {
  component: string;
  quantity: number;
  state: TProcessState;
  isRunning: boolean;
  createdAt: Date;
  interval: IInterval;
}

export interface IProcessStartDto {
  component: string;
  quantity: number;
}
