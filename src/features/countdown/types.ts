import { UseQueryResult } from "@tanstack/react-query";
import { IProcess } from "../process/types";

export type TTimeoutType = "PROCESS_TIMEOUT" | "EXTENSION_TIMEOUT";

export type TProcessStatus = Pick<UseQueryResult<IProcess, Error>, "data" | "isSuccess" | "isFetching">;
