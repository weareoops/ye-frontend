import Layout from "../components/Layout";
import {useEffect} from "react";
import useStore from "../lib/store";

function bytesToSize(bytes) {
    var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
    if (bytes == 0) return '0 Byte';
    var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
    return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i];
}

const Process = () => {
    const {initializeSocket, getProcesses, processes} = useStore()

    useEffect(() => {
        initializeSocket('http://localhost:3031')
        getProcesses()
    }, [])

    return(
        <Layout>
            <h1 className="text-lg font-semibold">Process List [{processes?.all}]</h1>
            <section>
                {processes?.list?.length && processes.list.map((p) => {
                    return(
                        <p>
                            [PID: {p.pid}] -- {p.command}  --> {p.mem}
                        </p>
                    )
                })}
            </section>
        </Layout>
    )
}

export default Process