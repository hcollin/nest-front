import { Button, Card, CardContent, Stack } from '@mui/material';
import { useService } from 'jokits-react';
import React from 'react';
import { Result } from '../services/Result.model';


const ResultsView = () => {

    const [res, send] = useService<Result[]>("resultsService");

    return (
        <div>
            <h2>Results</h2>

            <Stack spacing={2}>
                {res && res.map((r: Result) => {

                    return (
                        <Card key={r.ts}>
                            <CardContent>
                                <b>{r.method} : {r.url}</b>
                                <p>{r.results}</p>
                            </CardContent>
                        </Card>
                    );
                })}
            </Stack>
        </div>
    )
}

export default ResultsView;