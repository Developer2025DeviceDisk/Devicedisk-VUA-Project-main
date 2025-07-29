// app/components/Hero.tsx
import About from "./components/About";
import { WithGenericLoader } from "./components/Loader";

export default function Homepage() {
  return (
    <div>
      <WithGenericLoader>
        <About />
      </WithGenericLoader>
    </div>
  );
}
