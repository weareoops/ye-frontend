import {DateTime} from 'luxon'
import {useEffect, useState} from "react";
import Chart from "../components/Chart";
import secondsToHms from "../lib/secondsToHMS";
import useStore from "../lib/store";

export default function Home() {
  const [time, setTime] = useState(DateTime.fromJSDate(new Date()).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY))
  const {initializeSocket, users, sysInfo, sysResources} = useStore()

  useEffect(() => {
    setInterval(() => {
      setTime(DateTime.fromJSDate(new Date()).toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY));
    }, 20000)

    initializeSocket('http://localhost:3031')
  }, [])

  return (
    <div className="flex flex-col w-full items-center justify-center min-h-screen">
      <main className="w-3/5 min-h-screen my-5">
        <section className="my-4">
          <section className="w-full h-40 bg-purple-500 flex items-center rounded-md text-white border-2 border-purple-400">
            <h1 className="text-xl ml-4 font-bold">
              Today is {time}
            </h1>
          </section>
          <section className="mt-10 w-full flex-1">
            <section className="mb-4">
              <h1 className="text-lg font-semibold">
                Desktop Resources
              </h1>
              <section className="w-full flex justify-between text-gray-500 font-semibold">
                <p className="flex items-center justify-center">
                  <span className={`w-2 h-2 rounded-full block ${sysInfo ? 'bg-green-300' : 'bg-red-300'}`}></span>
                  <span className="ml-2">{sysInfo ? 'ONLINE' : 'OFFLINE'}</span>
                </p>
                <p>UPTIME: {sysResources?.length && secondsToHms(sysResources[0].uptime)}</p>
                <p>@hostname:{sysInfo && sysInfo.hostname}</p>
              </section>
            </section>
            {sysResources?.length &&
              <Chart data={sysResources}/>
            }
          </section>
        </section>
        <section>
          <h1 className="text-lg my-5 font-semibold">[{users?.users?.users.length && users?.users?.length}] Connected Sockets</h1>
          {users?.users &&
          <section className="my-4 w-full flex flex-col">
            <span><strong>CLIENT:</strong> {users.users.clientID}</span>
            {users.users.users && users.users.users.map((u) => {
              return(
                  <span key={u.id}><p><strong>ID:</strong> {u.id}</p></span>
              )
            })
            }
          </section>
          }
        </section>
        <section>
          <h1 className="text-lg my-5 font-semibold">
            [{sysResources?.length}] Data
          </h1>
          {sysResources?.slice(0, 70).map((y) => {
            return(
                <section className="my-4 w-full" key={y.created_at}>
                  <p> [%{Math.floor(y?.percent)}]  {DateTime.fromJSDate(new Date(y?.created_at)).toRelative()} <strong>---></strong> [{y?.web ? 'WEB' : y?.client ? 'Ⓒ' : 'INITIAL'}]</p>
                </section>
            )
          })}
        </section>
      </main>
      <footer className="flex w-full items-center justify-center">
        <section className="w-3/5 my-4">
          <p>[ oops ]</p>
        </section>
      </footer>
    </div>
  )
}
