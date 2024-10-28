export class RateLimitError extends Error {
  constructor(public resetTime: number) {
    super('Límite de peticiones excedido');
    this.name = 'RateLimitError';
  }
}