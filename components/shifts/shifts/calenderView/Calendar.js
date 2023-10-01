import React, { useEffect, useState, useRef, createRef } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import { PopoverHeader, PopoverBody } from "reactstrap";
import styles from "./Calendar.module.scss";
import WeekOrMonthDropdown from "./WeekOrMonthDropdown";
import { OverlayTrigger } from "react-bootstrap";
import Popover from "react-bootstrap/Popover";
import Overlay from "react-bootstrap/Overlay";
import eventArray from "./events";
import useShiftListCalendarView from "../../../../hooks/Shifts/useShiftListCalendarView";

const Calendar = ({ initialFilters, filters, list_type }) => {
  const calendarRef = createRef(null);
  const [newEventArray, setNewEventArray] = useState(eventArray);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [weekOrMonth, setWeekOrMonth] = useState("Month view");
  const [allDay, setAllDay] = useState(false);
  const options = {
    CalendarView: ["Week view", "Month view"],
  };
  const { data, isLoading } = useShiftListCalendarView({
    ...filters,
    list_type,
  });

  const handleOptionChange = (key, value) => {
    if (value == weekOrMonth) {
      console.log("value", value == value);
      return;
    } else {
      setWeekOrMonth(value);
      changeView(`${value == "Week view" ? "timeGridWeek" : "dayGridMonth"}`);
      // value == "Week view" ? setAllDay(false) : setAllDay(true);
      setAllDay(!allDay);
      setNewEventArray(
        eventArray.map((data) => {
          return {
            ...data,
            allDay,
          };
        })
      );
    }
  };

  useEffect(() => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.getDate(currentDate);
    }
  }, [currentDate]);

  const changeView = (viewName) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().changeView(viewName);
    }
  };

  const goToPrevMonthOrWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.prev();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const goToNextMonthOrWeek = () => {
    if (calendarRef.current) {
      const calendarApi = calendarRef.current.getApi();
      calendarApi.next();
      setCurrentDate(calendarApi.getDate());
    }
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <OverlayTrigger
          trigger={["click"]}
          placement="auto"
          rootClose={true}
          overlay={
            <Popover
              className={styles.popover}
              id={`event-popover-${eventInfo.event.id}`}
            >
              <Popover.Body>
                <div className={styles.popUpWrapper}>
                  <div className={`${styles.heading}`}>
                    <span>{eventInfo.event.title} </span>
                    <span>{eventInfo.event.extendedProps.personRequired}</span>
                  </div>
                  <p>
                    @{eventInfo.event.extendedProps.location}
                    <span
                      style={{
                        backgroundColor: `${eventInfo.event.backgroundColor}`,
                      }}
                    ></span>
                  </p>

                  <p>09:00 AM to 10:00 AM</p>
                  <p>£10.77 per hour</p>

                  <div className="d-flex justify-between items-center">
                    {/* <Link
                      href={`/shifts/worker-approval?shift_id=${shift.shift_system_id}&role=door-supervisor&candidate=interested`}
                    > */}
                    <button className="btn btn-green rounded">
                      <span>Candidates</span>
                    </button>
                    {/* </Link> */}
                    {/* More */}
                  </div>
                </div>
              </Popover.Body>
            </Popover>
          }
        >
          <div className={`${styles.calendar_event} px-1`}>
            <div className="d-flex justify-content-between align-content-center py-1">
              <span>{eventInfo.event.title}</span>
              <span>{eventInfo.event.extendedProps.personRequired}</span>
            </div>
            <span>
              {" "}
              {weekOrMonth === "Week view" && (
                <span>{eventInfo.timeText}</span>
              )}{" "}
            </span>
          </div>
        </OverlayTrigger>
      </>
    );
  };

  const handleDatesRendered = (info) => {
    const startDate = info.view.activeStart;
    const endDate = info.view.activeEnd;
    // startDate;
    // endDate;
  };

  return (
    <>
      <br />
      <div className={`${styles.monthOrWeekWrapper} d-flex`}>
        <div className={`${styles.goToMonthOrWeek}`}>
          <img
            src={`${process.env.APP_URL}/images/arrow_forward_calendar.png`}
            onClick={goToPrevMonthOrWeek}
          />
          <div className={`${styles.monthAndYearName}`}>
            {" "}
            {currentDate.toLocaleString("default", {
              month: "long",
              year: "numeric",
            })}
          </div>
          <img
            src={`${process.env.APP_URL}/images/arrow_forward_calendar.png`}
            onClick={goToNextMonthOrWeek}
          />
        </div>
        <div className={`${styles.weekOrMonthDropDownDiv}`}>
          {Object.keys(options).map((key) => (
            <WeekOrMonthDropdown
              key={key}
              options={options[key]}
              selectedOption={weekOrMonth}
              setSelectedOption={(value) => handleOptionChange(key, value)}
            />
          ))}
        </div>
      </div>
      <br />
      <div className="bg-white">
        {isLoading ? (
          <div>Loading..</div>
        ) : (
          <FullCalendar
            ref={calendarRef}
            initialView="dayGridMonth"
            plugins={[
              dayGridPlugin,
              interactionPlugin,
              timeGridPlugin,
              listPlugin,
            ]}
            allDaySlot={false}
            events={newEventArray}
            dayMaxEventRows={3}
            dayPopoverFormat={{ month: "short", day: "numeric" }}
            eventTimeFormat={{
              hour: "2-digit",
              minute: "2-digit",
              meridiem: "short",
            }}
            dayHeaderFormat={{
              weekday: "short",
              month: "short",
              day: "numeric",
              omitCommas: true,
            }}
            dayHeaderContent={(el) => {
              let day = el.text.split(" ")[0];
              let month = el.text.split(" ")[1];
              let date = el.text.split(" ")[2];
              let headerText;
              if (weekOrMonth == "Week view") {
                headerText = (
                  <span>
                    {day}
                    <br />
                    {date} {month}
                  </span>
                );
              } else {
                headerText = <span>{day}</span>;
              }

              return <span>{headerText}</span>;
            }}
            slotDuration={"01:00:00"}
            contentHeight="auto"
            headerToolbar={false}
            titleFormat={{ month: "short" }}
            // height={"100vh"}
            eventContent={renderEventContent}
            datesSet={(arg) => {
              // arg.start //starting visible date
              // arg.end//ending visible date
            }}
          />
        )}
      </div>
      <br />
      <br />
    </>
  );
};
export default Calendar;
