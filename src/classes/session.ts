import Collection from '../collections'

export default class Session {
    public id: string
    public userId: string

    public async load(db: any, id: string, userId: string) {
        if (id === null) {
            if (userId !== null) {
                this.createSession(db, userId)
            }
        }
    }

    private async createSession(db: any, id: string) {
        const sessions = db.collections(Collection.Session)
    }
}