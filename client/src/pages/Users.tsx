import React, { useEffect, useState, useMemo } from "react";
import {
  Form,
  Row,
  Col,
  Card,
  Button,
  Badge,
  Container,
  Table,
  Pagination,
} from "react-bootstrap";
import Animate from "../components/Animate";
import useGetRequest from "../hooks/api/useGetRequest";
import usePostRequest from "../hooks/api/usePostRequest";
import { users, deleteUsers } from "../api/api";
import { useAuth } from "../context/auth";
import UserStatsCard from "../components/UserStatsCard";
import useUserStats from "../hooks/useUserStats";

const Users = () => {
  const { user: curr_user } = useAuth();
  const { sendRequest, loading, error, response } = useGetRequest(users);
  const [data, setData] = useState([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    if (response) {
      setData(response);
    }
  }, [response]);

  const { sendRequest: deleteSendRequest } = usePostRequest(deleteUsers);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    phone: "",
    role: "",
    account_verified: "",
  });

  const handleFilterChange = (field: any, value: any) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
    setCurrentPage(1); // Reset to first page on filter change
  };
  const stats = {
    total_users: data.length,
    verified_users: data.filter((item) => item.account_verified == 1).length,
    unverified_users: data.filter((item) => item.account_verified != 1).length,
  };
  const filteredRows = data?.filter((row: any) => {
    if (row?.phone == null) {
      row.phone = "";
    }
    return (
      row?.first_name?.toLowerCase()?.includes(filters?.name?.toLowerCase()) &&
      row?.email?.toLowerCase()?.includes(filters?.email?.toLowerCase()) &&
      row?.phone?.toLowerCase()?.includes(filters?.phone?.toLowerCase()) &&
      (filters?.role !== "" ? row?.role === filters?.role : true) &&
      row?.account_verified
        ?.toString()
        ?.toLowerCase()
        ?.includes(filters?.account_verified?.toString()?.toLowerCase())
    );
  });
  console.log(filteredRows);
  // Pagination calculations
  const totalPages = Math.ceil(filteredRows?.length / rowsPerPage);
  const goToPage = (page: any) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  const totalEntities = filteredRows?.length;
  const startIndex = (currentPage - 1) * rowsPerPage + 1;
  const endIndex = Math.min(currentPage * rowsPerPage, totalEntities);

  const getVisiblePages = () => {
    const maxVisible = 10;

    let start = Math.max(currentPage - maxVisible / 2, 1);
    let end = start + maxVisible - 3;

    if (end > totalPages) {
      end = totalPages;
      start = Math.max(end - maxVisible + 1, 1);
    }

    const pages = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }

    return pages;
  };

  const paginatedData = () => {
    const start = (currentPage - 1) * rowsPerPage;
    return filteredRows?.slice(start, start + rowsPerPage);
  };

  const handleDelete = (user: any) => {
    if (curr_user.id !== user.id) {
      if (!window.confirm("Are you sure you want to delete this user?")) return;
      deleteSendRequest({ id: user.id }).then(() =>
        setData((prev: any) => prev.filter((u: any) => u.id !== user.id)),
      );
    } else alert("You cannot delete your own account!");
  };

  useEffect(() => {
    sendRequest();
  }, []);

  return (
    <Container fluid>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <h3 className="text-center mb-4">User Management</h3>
          <p className="text-center">
            Here you can add, remove, update, invite and manage your users
            related settings
          </p>
        </Col>
      </Row>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Animate duration={0.5} y={25}>
            <UserStatsCard stats={stats} />
          </Animate>
        </Col>
      </Row>
      <Row className="justify-content-center ps-3 pe-3 pt-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Animate duration={0.5} y={25}>
            <div className="d-flex align-items-center">
              <span className="me-2">
                <b>Results per page:</b>
              </span>
              <Form.Select
                size="sm"
                style={{ width: "100px" }}
                value={rowsPerPage}
                onChange={(e) => {
                  setRowsPerPage(Number(e.target.value));
                  setCurrentPage(1);
                }}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
                <option value={100}>100</option>
              </Form.Select>
            </div>
          </Animate>
        </Col>
      </Row>
      <Row className="justify-content-center p-3">
        <Col xs={12} md={12} lg={12} xl={10} xxl={10}>
          <Animate duration={0.5} y={25}>
            <Card>
              <Card.Body className="pt-1 pb-1 ps-0 pe-0">
                <div style={{ overflowX: "auto" }}>
                  <Table
                    striped
                    hover
                    className="mb-0 bordered striped hover fixed-table"
                  >
                    <thead
                      style={{
                        boxShadow: "0px 1px 3px rgba(0,0,0,0.15)",
                        backgroundColor: "grey",
                      }}
                    >
                      <tr>
                        <th className={"ps-4"}>First Name</th>
                        <th
                          style={{ width: "150px" }}
                          className="d-none d-lg-table-cell"
                        >
                          Phone
                        </th>
                        <th className="d-none  d-md-table-cell">Email</th>
                        <th
                          style={{ width: "150px" }}
                          className="d-none  d-md-table-cell"
                        >
                          Account Verified
                        </th>
                        <th style={{ width: "125px" }}>Role</th>
                        <th style={{ width: "125px" }}></th>
                      </tr>
                      {/* Filter row */}
                      <tr>
                        <th className={"ps-4"}>
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Name"
                            value={filters.name}
                            onChange={(e) =>
                              handleFilterChange("name", e.target.value)
                            }
                          />
                        </th>

                        <th className="d-none d-lg-table-cell">
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Phone"
                            value={filters.phone}
                            onChange={(e) =>
                              handleFilterChange("phone", e.target.value)
                            }
                          />
                        </th>

                        <th className="d-none  d-md-table-cell">
                          <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search Email"
                            value={filters.email}
                            onChange={(e) =>
                              handleFilterChange("email", e.target.value)
                            }
                          />
                        </th>
                        <th className="d-none  d-md-table-cell">
                          <Form.Select
                            size="sm"
                            value={filters.account_verified}
                            onChange={(e) =>
                              handleFilterChange(
                                "account_verified",
                                e.target.value,
                              )
                            }
                          >
                            <option value="">All</option>
                            <option value="1">Verified</option>
                            <option value="0">Not Verified</option>
                          </Form.Select>
                        </th>
                        <th style={{ width: "125px" }}>
                          <Form.Select
                            size="sm"
                            value={filters.role}
                            onChange={(e) =>
                              handleFilterChange("role", e.target.value)
                            }
                          >
                            <option value="">All Roles</option>
                            <option value="admin">Admin</option>
                            <option value="members">Member</option>
                            <option value="subadmin">SubAdmin</option>
                            <option value="Guest">Guest</option>
                            <option value="guest">guest</option>
                          </Form.Select>
                        </th>
                        <th style={{ width: "125px" }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedData()?.map((user: any) => (
                        <tr key={user.id}>
                          <td className={"ps-4"}>{user.first_name}</td>
                          <td className="d-none  d-lg-table-cell">
                            {user.phone}
                          </td>
                          <td className="d-none  d-md-table-cell">
                            {user.email}
                          </td>
                          <td className="d-none  d-md-table-cell">
                            {user.account_verified == "0" ? (
                              <Badge bg="danger">Not Verified</Badge>
                            ) : (
                              <Badge bg="success">Verified</Badge>
                            )}
                          </td>
                          <td style={{ width: "125px" }}>{user.role}</td>
                          <td style={{ width: "125px" }}>
                            <div style={{ width: "125px" }}>
                              <Button
                                size="sm"
                                variant="light"
                                className="me-2"
                                onClick={() => {}}
                              >
                                Edit
                              </Button>
                              <Button
                                size="sm"
                                variant="danger"
                                onClick={() => handleDelete(user)}
                              >
                                Delete
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
                <Row className="align-items-center ps-4 pe-4">
                  {paginatedData().length === 0 ? (
                    <Col className="text-center text-muted col-12 pt-4">
                      <small className="text-muted">
                        <b>No Results Found </b>
                      </small>
                    </Col>
                  ) : null}
                </Row>
                {/* Bottom Row: Info + Pagination */}
                <Row className="align-items-center ps-4 pe-4">
                  <Col md={6}>
                    <small className="text-muted">
                      Showing {startIndex} to {endIndex} of {totalEntities}{" "}
                      entities
                    </small>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    {/* PAGINATION */}
                    <Pagination className="justify-content-center mt-3">
                      <Pagination.First
                        onClick={() => goToPage(1)}
                        disabled={currentPage === 1}
                      />
                      <Pagination.Prev
                        onClick={() => goToPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      />

                      {getVisiblePages().map((page) => (
                        <Pagination.Item
                          key={page}
                          active={page === currentPage}
                          onClick={() => goToPage(page)}
                        >
                          {page}
                        </Pagination.Item>
                      ))}

                      <Pagination.Next
                        onClick={() => goToPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      />
                      <Pagination.Last
                        onClick={() => goToPage(totalPages)}
                        disabled={currentPage === totalPages}
                      />
                    </Pagination>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Animate>
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
