export class Quest {
    id: number;
    name: string;
    description?: string;
    chainQuests?: Quest[];
    active?: boolean;
}