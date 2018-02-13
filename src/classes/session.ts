import Collection from '../collections'

export default class Session {
    public id: string
    public userId: string

    public async load(db: any, id: string, userId: string) {
        if (id === null) {
            if (userId !== null) {
                await this.createSession(db, userId)
            }
        } else {
            await this.loadSession(db, id)
        }
    }

    private async createSession(db: any, userId: string) {
        const sessions = db.collection(Collection.Session)
        const session = (await sessions.insertOne({ userId })).ops[0]
        this.id = session._id
        this.userId = session.userId
    }

    private async loadSession(db: any, id: string) {
        const sessions = db.collection(Collection.Session)
        const session = await sessions.findOne({ _id: id })
        console.log(session)
    }
}
