import { JokiEvent, JokiService, JokiServiceApi } from "jokits";
import { Result } from "./Result.model";


export function createResultService(sid: string, api: JokiServiceApi): JokiService<Result> {

    let results: Result[] = [];


    function eventHandler(event: JokiEvent) {
        if (event.to === sid) {
            switch (event.action) {
                case "add":
                    const b = event.data as Result;
                    addResult(b);
                    break;
                case "clear":
                    clearResults();
                    break;
            }
        }
    }


    function addResult(r: Result) {
        results.push(r);
        api.updated([...results]);

    }

    function clearResults() {
        results = [] 
        api.updated([]);
    }

    function getState(): Result[] {
        return [...results];
    }

    return {
        eventHandler,
        getState
    }

}