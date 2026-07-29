import { domMax } from "framer-motion";

// Loaded lazily via LazyMotion so the drag/gesture engine ships as its
// own chunk instead of bloating the main bundle every `motion.*` usage
// would otherwise pull in synchronously.
export default domMax;
