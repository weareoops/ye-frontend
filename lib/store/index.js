import create from 'zustand'
import io from 'socket.io-client'

let socketConnection;

const useStore = create((set, get) => ({
    sysInfo: null,
    sysResources: [],
    users: null,
    socketConnection: null,
    processes: [],
    getProcesses: () => {
        socketConnection.emit('process:web', {web: true})

        socketConnection.on('process:web', (processInfo) => {
            set({
                processes: processInfo
            })
        })
    },
    initializeSocket: (socketAdr) => {
        socketConnection = io(socketAdr)

        socketConnection.on('connect', () => {
            console.log('Connected to socket')

            set({
                socketConnection: socketConnection
            })

            socketConnection.emit('hi', {web: true})
            socketConnection.emit('sysinfo:web', {web: true})
        })

        socketConnection.on('users:web', (userInfoData) => {
            set({
                users: userInfoData
            })
        })

        socketConnection.on('sysinfo:web', (sysInfoData) => {
            set({
                sysInfo: sysInfoData.sysInfo,
                sysResources: sysInfoData.entries
            })
        })

        socketConnection.on('resource:web', (sysResourceData) => {
            const {sysResources} = get()

            set({
                sysResources: [sysResourceData, ...sysResources]
            })
        })
    }
}))

export default useStore