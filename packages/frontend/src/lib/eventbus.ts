// Rule 3: Simple Event System
// Simple event emitter for feature communication
type EventHandler = (data: any) => void;

class SimpleEventBus {
  private events: Map<string, EventHandler[]> = new Map();

  emit(eventName: string, data?: any) {
    console.log('event-emit', { event: eventName, hasData: !!data });
    const handlers = this.events.get(eventName) || [];
    handlers.forEach(handler => handler(data));
  }

  on(eventName: string, handler: EventHandler) {
    console.log('event-subscribe', { event: eventName });
    if (!this.events.has(eventName)) {
      this.events.set(eventName, []);
    }
    this.events.get(eventName)!.push(handler);
  }

  off(eventName: string, handler: EventHandler) {
    const handlers = this.events.get(eventName) || [];
    const index = handlers.indexOf(handler);
    if (index > -1) {
      handlers.splice(index, 1);
    }
  }
}

export const EventBus = new SimpleEventBus();