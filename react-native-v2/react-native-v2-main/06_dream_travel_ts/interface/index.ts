export interface IAppData {
    services: IService[];
    circuits: ICircuit[];
}

export interface ICircuit {
    id: number;
    country: string;
    description: string;
    price: number;
    date: string;
}

export interface ICircuitProps {
    circuit: ICircuit;
}

export interface IService {
    name: string;
    img: any;
    content: string;
}
