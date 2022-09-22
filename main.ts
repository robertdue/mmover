import { container } from "./src/Inversify.config";
import { TYPES } from "./src/Types";
import { Worker} from "./src/Worker";

container.get<Worker>(TYPES.Worker).run();
