import { createContext, useState } from "react"
import { Event, hydrateClientStorage, useEventLoop } from "/utils/state.js"

export const initialState = {"current_chat": "Intros", "drawer_open": false, "is_hydrated": false, "line_chart_state": {"data": [{"name": "Page 1", "uv": 4000, "pv": 2400, "amt": 2400, "latest_response": "Hello", "emotion": "neutral"}, {"name": "Page 2", "uv": 3000, "pv": 1398, "amt": 2210, "latest_response": "Ass", "emotion": "negative"}, {"name": "Page C", "uv": 2000, "pv": 9800, "amt": 2290, "latest_response": "Shit", "emotion": "negative"}, {"name": "Page D", "uv": 2780, "pv": 3908, "amt": 2000, "latest_response": "Good Boy", "emotion": "positive"}, {"name": "Page E", "uv": 1890, "pv": 4800, "amt": 2181, "latest_response": "Bad boy", "emotion": "negative"}, {"name": "Page F", "uv": 2390, "pv": 3800, "amt": 2500, "latest_response": "Hello", "emotion": "neutral"}, {"name": "Page G", "uv": 3490, "pv": 4300, "amt": 2100, "latest_response": "Hello", "emotion": "neutral"}], "emote_data": [{"emotion": "Negative", "frequency": 3}, {"emotion": "Positive", "frequency": 1}, {"emotion": "Neutral", "frequency": 3}], "pv_type": "monotone", "uv_type": "monotone"}, "modal_open": false, "new_chat_name": "", "processing": false, "question": "", "router": {"session": {"client_token": "", "client_ip": "", "session_id": ""}, "headers": {"host": "", "origin": "", "upgrade": "", "connection": "", "pragma": "", "cache_control": "", "user_agent": "", "sec_websocket_version": "", "sec_websocket_key": "", "sec_websocket_extensions": "", "accept_encoding": "", "accept_language": ""}, "page": {"host": "", "path": "", "raw_path": "", "full_path": "", "full_raw_path": "", "params": {}}}}

export const ColorModeContext = createContext(null);
export const StateContext = createContext(null);
export const EventLoopContext = createContext(null);
export const clientStorage = {"cookies": {}, "local_storage": {}}

export const initialEvents = () => [
    Event('state.hydrate', hydrateClientStorage(clientStorage)),
]

export const isDevMode = true

export function EventLoopProvider({ children }) {
  const [state, addEvents, connectError] = useEventLoop(
    initialState,
    initialEvents,
    clientStorage,
  )
  return (
    <EventLoopContext.Provider value={[addEvents, connectError]}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </EventLoopContext.Provider>
  )
}