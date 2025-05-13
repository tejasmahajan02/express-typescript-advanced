export class ApiResponseDto<T, M = Record<string, any>> {
  readonly hasData: boolean;

  constructor(
    readonly message: string,
    readonly data: T | null = null,
    readonly meta: M | null = null,
    readonly fromCache: boolean = false,
  ) {
    this.hasData = data !== null && data !== undefined;
  }

  static ok<T, M = Record<string, any>>(
    message: string,
    data?: T,
    meta?: M,
    fromCache = false,
  ): ApiResponseDto<T, M> {
    return new ApiResponseDto(message, data ?? null, meta ?? null, fromCache);
  }

  static noContent<M = Record<string, any>>(
    message: string,
    meta?: M,
  ): ApiResponseDto<null, M> {
    return new ApiResponseDto(message, null, meta ?? null);
  }
}

export type ApiResponse<T> = ApiResponseDto<T> | ApiResponseDto<null>;
