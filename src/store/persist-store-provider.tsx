"use client";

import { store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export const persistor = persistStore(store);

export default function PersistStoreProvider({ children }: { children: React.ReactNode }) {
    return <PersistGate persistor={persistor}>{children}</PersistGate>;
}
