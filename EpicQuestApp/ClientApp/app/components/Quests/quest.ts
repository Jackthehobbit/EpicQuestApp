export class Quest {
    id: number;
    title: string;
    description?: string;
    chainQuests?: Quest[];
    active?: boolean;
}