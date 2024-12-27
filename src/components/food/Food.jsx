import React, { Component } from "react";

export default class Food extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      price: "",
      desc: "",
      editId: null, // For tracking which item is being edited
      data: JSON.parse(localStorage.getItem("data")) || [],
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.data !== this.state.data) {
      localStorage.setItem("data", JSON.stringify(this.state.data));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, price, desc, editId, data } = this.state;

    if (!name || !price || !desc) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      // Update existing item
      const updatedData = data.map((item) =>
        item.id === editId ? { ...item, name, price, desc } : item
      );
      this.setState({
        data: updatedData,
        name: "",
        price: "",
        desc: "",
        editId: null,
      });
    } else {
      // Add new item
      const newFood = {
        id: Date.now(),
        name,
        price,
        desc,
      };
      this.setState({
        data: [...data, newFood],
        name: "",
        price: "",
        desc: "",
      });
    }
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      const filteredData = this.state.data.filter((item) => item.id !== id);
      this.setState({ data: filteredData });
    }
  };

  handleEdit = (id) => {
    const foodToEdit = this.state.data.find((item) => item.id === id);
    this.setState({
      name: foodToEdit.name,
      price: foodToEdit.price,
      desc: foodToEdit.desc,
      editId: id,
    });
  };

  render() {
    return (
      <div className="flex">
        {/* Form Section */}
        <div className="w-80 h-screen bg-slate-200 p-5">
          <form onSubmit={this.handleSubmit}>
            <input
              autoFocus
              value={this.state.name}
              onChange={(e) => this.setState({ name: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Name"
              type="text"
            />
            <input
              value={this.state.price}
              onChange={(e) => this.setState({ price: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Price"
              type="number"
            />
            <input
              value={this.state.desc}
              onChange={(e) => this.setState({ desc: e.target.value })}
              className="w-full h-10 mb-3 indent-3"
              placeholder="Description"
              type="text"
            />
            <button className="w-full h-10 bg-blue-500 text-white">
              {this.state.editId ? "Update Food" : "Add Food"}
            </button>
          </form>
        </div>

        {/* List Section */}
        <div className="p-5 flex flex-wrap gap-3 flex-1 items-start content-start">
          {this.state.data.map((food) => (
            <div key={food.id} className="w-72 shadow-md">
              <div className="w-full h-52 bg-slate-200"></div>
              <div className="p-4">
                <h3 className="text-xl font-medium">{food.name}</h3>
                <p className="line-clamp-1">{food.desc}</p>
                <p className="font-medium">{food.price} so'm</p>
                <div className="mt-3">
                  <button
                    onClick={() => this.handleDelete(food.id)}
                    className="bg-slate-400 px-4 py-1"
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => this.handleEdit(food.id)}
                    className="ml-2 bg-green-400 px-4 py-1"
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
