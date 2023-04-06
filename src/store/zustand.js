import dayjs from "dayjs";
import { create } from "zustand";
import { getMonth } from "../utils/util";
import toast, { Toaster } from 'react-hot-toast';
import { Navigate } from "react-router-dom";
import { useReducer } from "react";
import axios from "axios";
// const url2 = 'http://mstation.tukangbersih.com/index.php/api/auth/login'
const url2 = import.meta.env.VITE_API_URL


const accessToken = localStorage.getItem('accessToken');
const isi_imgUrl = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=4&w=256&h=256&q=60";
const isi_user = {
  name: "Super Admin",
  age: 29,
  email: "eco@ecocare.id",
  title: "Regional Paradigm Technician",
  department: "Optimization",
  status: "Active",
  role: "Admin",
  imgUrl: isi_imgUrl
}

const savedEventsReducer = (state, {type, payload}) => {
  switch (type) {
    case 'push':
      return[...state, payload];
    case 'update':
      return state.map(()=> (evt.id === payload.id ? payload : evt))
    case 'delete':
      return[...state, payload];
    default:
      throw new Error();
  }
}

const toastContent = {
  duration: 4000,
  position: "bottom-center",
  style: {
    color: '#000000',
    padding: "10px",
    marginRight: "22px",
    marginBottom: "40px",
    backgroundColor: '#f3f4f6',
    borderColor: '#9ca3af',
    borderRadius: "12px",
    borderBottomWidth: "4px",
    minWidth: "400px",
  }
}

export const useStore = create((set) => ({
  count: 0,
  countPlus: () => set((state) => ({ count: state.count + 1 })),
  countMinus: () => set((state) => ({ count: state.count - 1 })),
  countReset: () => set({ count: 0 }),

  //Login Signin
  initialState: accessToken
    ? { _isLoggedIn: true, accessToken, user: isi_user }
    : { _isLoggedIn: false, accessToken: null, user: null },
  post: (values)=> { 
    
    // console.log('values==>', values)
    axios.post(`${url2}/auth/login`, {
      "id_privileges": "10",
      "email": "root@gmail.com",
      "password": "merdeka07",
      "app_id": "1555309664580",
      "api_secret": "4d672ce3-e422-4d8a-86ff-fabb1808a689"
    })
    .then(function (res) {
      if (values.username && values.password) {
        set({
          initialState: {
            _isLoggedIn: true,
            user: localStorage.setItem("user", res.data.userid),
            accessToken: localStorage.setItem("accessToken", res.data.token),
          }
        })
        toast.success("Selamat anda berhasil login!", toastContent);

      } else {
        toast.error("Mohon isi in formasi login dengan benar", toastContent);
      }
    })
    .catch( (error) => {
      console.log('errorr ==>>', error);
    });
  },
  logout: () => {  
    localStorage.clear(); 
    window.location.href = "/signin";
  },
  loggedIn: true,
  clickLogIn: () => set((state) => ({ loggedIn: true })),
  namaLogin: null,
  // setNamaLogin

  // Calendar
  monthIndex: 0,
  // setMonthIndex: (index) => {},
  setMonthIndex: (index) => set({ monthIndex: index }),
  handlePrevMonth: () => set((state) => ({ monthIndex: state.monthIndex - 1 })),
  handleNextMonth: () => set((state) => ({ monthIndex: state.monthIndex + 1 })),
  handleReset: () => set((state) => ({
    monthIndex: state.monthIndex === dayjs().month() 
    ? state.monthIndex + Math.random() 
    : dayjs().month()
  })),

  currenMonth: getMonth(),
  setCurrenMonth: () => set((state) => ({ currenMonth: state.currenMonth  })),

  currentMonth: getMonth(),
  setCurrentMonth: () => set((state) => ({ currentMonth: state.currentMonth  })),
  currentMonthIdx: dayjs().month(),
  setCurrentMonthIdx: () => set((state) => ({ currentMonthIdx: state.currentMonthIdx })),

  // Small Calendar
  // monthIndexSmall: 0,
  // setMonthIndexSmall: (index) => {},
  // handlePrevMonthSmall: () =>
  //   set((state) => ({ monthIndexSmall: state.monthIndexSmall - 1 })),
  // handleNextMonthSmall: () =>
  //   set((state) => ({ monthIndexSmall: state.monthIndexSmall + 1 })),
  // handleResetSmall: () =>
  //   set((state) => ({ monthIndexSmall: dayjs().month() })),
  smallCalendarMonth: 0,
  setSmallCalendarMonth: (index) => {},
  daySelected: null,
  setDaySelected: (day) => set({ daySelected: day }),
  // setDaySelected: (day, daySelected) => set({daySelected: day = daySelected}),

  dayEvents: [{}, {}],
  showEventModal: false,
  setShowEventModal: (val) => set({showEventModal: val}),

  savedEvents: null,
  dispatchCalEvent: null,

  filteredEvents: [],
  // selectedEvent: null,
  setSelectedEvent: () => {},

}));
