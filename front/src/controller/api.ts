export default class API {
    private static instance: API | null = null;
    private ipServer: string;
    private portServer: string; 


    private constructor(localhost = false) {
        if(localhost){
            this.ipServer = "localhost"
        }else{
            this.ipServer = "45.231.133.38"
        }
        this.portServer = "8080"
    }
    
    static getInstance(): API {
        if (!API.instance) {
            API.instance = new API();
        }
        return API.instance;
    }
    
    async preview(data_json: string): Promise<Response>{
        return await fetch(`http://${this.ipServer}:${this.portServer}/certificate/preview`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: data_json
          })
    }

    async save(data_json: string): Promise<Response>{
        return await fetch(`http://${this.ipServer}:${this.portServer}/certificate/save`, {
            method: "POST",
            headers: {
              'Content-Type': 'application/json'
            },
            body: data_json
          })
    }

}