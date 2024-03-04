export default class API {
    private static instance: API | null = null;
    private ipServer: string;


    private constructor(localhost = false) {
        if(localhost){
            this.ipServer = "http://localhost:8080"
        }else{
            this.ipServer = "https://magmacursosltda.com.br"
        }
        
    }
    
    static getInstance(): API {
        if (!API.instance) {
            API.instance = new API(true);
        }
        return API.instance;
    }
    
    async preview(data_json: string): Promise<Response>{
        return await fetch(`${this.ipServer}/certificate/preview`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: data_json
          })
    }

    async save(data_json: string): Promise<Response>{
        return await fetch(`${this.ipServer}/certificate/save`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: data_json
          })
    }

    async list(): Promise<Response>{
        return await fetch(`${this.ipServer}/certificate/list`, {
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }

    async getPDF(id: number): Promise<Response>{
        return await fetch(`${this.ipServer}/certificate/view/${id}`,{
            method: "GET",
            headers: {
              'Content-Type': 'application/json'
            }
        })
    }

}