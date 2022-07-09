import React from "react";
import DatePicker from "react-datepicker";

const Filter = ({
    filterStartDate,
    setFilterStartDate,
    filterEndDate,
    setFilterEndDate,
    filterBy,
    orderBy,
    sortDirection,
    setFilterBySelect,
    setOrderBySelect,
    setSortDirection,
}) => {

   const handleFilter = (e) => {
       setFilterBySelect(e.target.value)
   }

   const HandleOrder = (e) => {
       setOrderBySelect(e.target.value)
   }

    const handleSubmitFilterByDates = (e) => {
       e.preventDefault()
    }

    const HandleSortOrder = (e) => {
        setSortDirection(e.target.value)
    }


    return(

        <div className="filters-container">
            <div className="filter-by">
                <select onChange={e => handleFilter(e)} value={filterBy}>
                    <option value="all">Show All</option>
                    <option value="1">Filter by completed</option>
                    <option value="0">Filter by active</option>
                </select>
                <form>
                    <div className="filter-by-dates">
                        <DatePicker selected={filterStartDate} onChange={(date) => setFilterStartDate(date)}/>
                        <DatePicker selected={filterEndDate} onChange={(date) => setFilterEndDate(date)}/>
                    </div>
                </form>
            </div>
            <div className="order-container">
            <div className="order-by">
                <select onChange={e => HandleOrder(e)} value={orderBy} >
                    <option value="id">Order By Id</option>
                    <option value="completed">Order by Status</option>
                    <option value="title">Order by Description</option>
                    <option value="date">Order by Date</option>
                </select>
            </div>
                <div className="order-by">
                    <select onChange={e => HandleSortOrder(e)} value={sortDirection} >
                        <option value="desc">Descending</option>
                        <option value="asc">Ascending</option>
                    </select>
                </div>
            </div>
        </div>
    );
}

export default Filter;