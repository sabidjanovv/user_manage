import React, { Component } from "react";
import { BiSolidToTop } from "react-icons/bi";

export default class Users extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      role: "",
      editId: null,
      users: JSON.parse(localStorage.getItem("users")) || [],
      showScrollButton: false,
    };
  }

  componentDidMount() {
    window.onscroll = () => {
      if (window.scrollY > 200) {
        this.setState({ showScrollButton: true });
      } else {
        this.setState({ showScrollButton: false });
      }
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevState.users !== this.state.users) {
      localStorage.setItem("users", JSON.stringify(this.state.users));
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, role, editId, users } = this.state;

    if (!name || !email || !role) {
      alert("All fields are required!");
      return;
    }

    if (editId) {
      const updatedUsers = users.map((user) =>
        user.id === editId ? { ...user, name, email, role } : user
      );
      this.setState({
        users: updatedUsers,
        name: "",
        email: "",
        role: "",
        editId: null,
      });
    } else {
      const newUser = { id: Date.now(), name, email, role };
      this.setState({
        users: [...users, newUser],
        name: "",
        email: "",
        role: "",
      });
    }
  };

  handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const filteredUsers = this.state.users.filter((user) => user.id !== id);
      this.setState({ users: filteredUsers });
    }
  };

  handleEdit = (id) => {
    const userToEdit = this.state.users.find((user) => user.id === id);
    this.setState({
      name: userToEdit.name,
      email: userToEdit.email,
      role: userToEdit.role,
      editId: id,
    });
  };

  scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  render() {
    return (
      <div className="min-h-screen bg-[#f0f8ff]">
        <header className="bg-[#0077b6] text-white p-4 shadow-md">
          <h1 className="text-center text-2xl font-bold">User Management</h1>
        </header>

        <div className="flex flex-col lg:flex-row">
          <div className="w-full lg:w-80 bg-[#0077b6] h-[95vh] p-5 shadow-md flex flex-col">
            <h2 className="text-2xl font-bold text-white mb-3 text-center">
              Create User
            </h2>
            <form
              onSubmit={this.handleSubmit}
              className="space-y-4 flex-1 flex flex-col"
            >
              <input
                value={this.state.name}
                onChange={(e) => this.setState({ name: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Name"
                type="text"
              />
              <input
                value={this.state.email}
                onChange={(e) => this.setState({ email: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
                placeholder="Email"
                type="email"
              />
              <select
                value={this.state.role || ""}
                onChange={(e) => this.setState({ role: e.target.value })}
                className="w-full h-10 p-2 border rounded-lg shadow-sm focus:outline-[#03045e]"
              >
                <option value="" disabled>
                  Select Role
                </option>
                <option value="admin">Admin</option>
                <option value="superadmin">Super Admin</option>
              </select>
              <button
                type="submit"
                className="w-full h-10 bg-[#0096c7] border-[1px] border-[#266181] text-white font-medium rounded-lg hover:bg-[#03045e] mt-4"
              >
                {this.state.editId ? "Update User" : "Add User"}
              </button>
            </form>
          </div>

          <div className=" p-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {this.state.users.map((user) => (
              <div
                key={user.id}
                className="bg-[#ade8f4] rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="p-4 flex flex-col justify-between flex-1">
                  <div>
                    <h3 className="text-lg font-bold text-gray-800">
                      {user.name}
                    </h3>
                    <p className="text-gray-700 font-medium">
                      Email: <span className="text-gray-600">{user.email}</span>
                    </p>
                    <p className="text-gray-700 font-medium">
                      Role: <span className="text-gray-600">{user.role}</span>
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      onClick={() => this.handleDelete(user.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => this.handleEdit(user.id)}
                      className="bg-[#4361ee] text-white px-4 py-2 rounded-lg hover:bg-[#3f37c9]"
                    >
                      Edit
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {this.state.showScrollButton && (
          <button
            onClick={this.scrollToTop}
            className="fixed bottom-6 right-6 bg-blue-500 text-white p-5 rounded-full shadow-lg hover:bg-blue-600"
          >
            <BiSolidToTop />
          </button>
        )}
      </div>
    );
  }
}
