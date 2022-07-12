import { useState } from "react"

export default function Route() {
  const [route, setRoute] = useState({
    route: '',
    stations : [],
  })

  const handleRoute = e =>{
    setRoute(route => ({
      ...route,
      route: e.target.value
    }))
  }

  const enabled = route.route && route.stations.every(
    station => Object.entries(station).every(([key, value]) => key === 'errors' ? Object.values(value).length === 0 : value)
  )

  const addStation = () => {
      setRoute(route => ({
        ...route,
        stations: [
          ...route.stations,
          {
            name: '',
            lat: '',
            lon: '',
            errors: {}
          }
        ]
      }))
  }
 

  const handleStation = (value, name, key) => {
    setRoute(route => ({
      ...route,
      stations: route.stations.map((station, i)=>{
        if (key === i) {
          station[name] = value
          let current = route.stations.find((r,index) => r[name] === value && key !== index)
          if (current) {
            station.errors[name] = `${name} değeri başka bir alanda ${value} değeriyle zaten tanımlı!`
          }
          else {
            delete station.errors[name]
          }
        }
        return station
      })
    }))
  }

  const handeSave = () => {
      alert('Yeni Durak Eklendi')
  }

  return (
   <div className="p-4 ">
        <div className="flex flex-col gap-4">
           <div className="flex gap-4">
              <input value={route.route} onChange={handleRoute} className="border outline-none rounded-md p-2" type="text" placeholder="Güzergah" />
              <button onClick={addStation} className="text-white p-3 bg-blue-900 rounded-3xl hover:bg-blue-300">Yeni Durak Ekle</button>
           </div>
              <div className=" bg-slate-600 h-px w-full" />
        </div>
        
        <div className="flex flex-col gap-4 pt-4">
              {route.stations.map((station,key)=>(
            <div key={key} className="flex flex-col gap-4">
                 <div className="flex gap-4">
                    <input className="border rounded-md outline-none p-2" type="text" onChange={e => handleStation(e.target.value, 'name', key)} placeholder="Durak Adı" />
                    <input className="border rounded-md outline-none p-2" type="text" onChange={e => handleStation(e.target.value, 'lat', key)} placeholder="Enlem" />
                    <input className="border rounded-md outline-none p-2" type="text" onChange={e => handleStation(e.target.value, 'lon', key)} placeholder="Boylam" />
                 </div>
                 <div className=" bg-slate-600 h-px w-full" />
            </div>
              ))}
        </div>
        <button onClick={handeSave} disabled={!enabled} className="mt-4 text-white p-3 bg-blue-900 rounded-3xl hover:bg-blue-300 disabled:bg-slate-600" type="button">Kaydet</button>
        <br />
        {/* <pre>{JSON.stringify(route, null, 2)}</pre> */}
   </div>
  )
}