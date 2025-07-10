import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs, deleteBlog } from "../redux/slices/blogSlice";
import { Link } from "react-router-dom";

const BlogList = () => {

    const dispatch = useDispatch();
    const { blogs, loading, pagination } = useSelector((state) => state.blog);

    const [page, setPage] = useState(1);
    const [search, setSearch] = useState("");

    useEffect(() => {
        dispatch(fetchBlogs({ page, limit: 10, search }));
    }, [dispatch, page, search]);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
        setPage(1); // reset to first page on new search
    };

    const handleDelete = (id) => {
        if (window.confirm("Are you sure to delete this blog?")) {
            dispatch(deleteBlog(id));
        }
    };

    return (
        <div className="container my-4">
            <div className="card">
                <div className="card-header d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">All Blogs</h4>
                    <input
                        type="text"
                        placeholder="Search by title..."
                        value={search}
                        onChange={handleSearchChange}
                        className="form-control w-50"
                    />
                </div>

                <div className="card-body py-40">
                    <div className="table-responsive">
                        <table className="table table-bordered table-hover mb-0">
                            <thead className="table-danger">
                                <tr>
                                    <th>#</th>
                                    <th>Title</th>
                                    <th>Category</th>
                                    <th>Image</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {!loading && blogs.length > 0 ? (
                                    blogs.map((blog, index) => (
                                        <tr key={blog._id}>
                                            <td>{(pagination.page - 1) * pagination.limit + index + 1}</td>
                                            <td>{blog.title}</td>
                                            <td>{blog?.category?.name || "N/A"}</td>

                                            <td>
                                                {blog.blogImage && (
                                                    <img src={blog.blogImage} alt={blog.blogImageAlt} width="60" />
                                                )}
                                            </td>
                                            <td>
                                                <button className="btn btn-sm btn-danger me-2" onClick={() => handleDelete(blog._id)}>
                                                    Delete
                                                </button>
                                                <Link to={`/edit-blog/${blog._id}`} className="btn btn-sm btn-primary">Edit</Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="6" className="text-center">
                                            {loading ? "Loading..." : "No blogs found"}
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="card-footer d-flex justify-content-between">
                    <button
                        className="btn btn-secondary"
                        disabled={pagination.page === 1}
                        onClick={() => setPage((prev) => prev - 1)}
                    >
                        ← Previous
                    </button>
                    <span className="mt-1">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>
                    <button
                        className="btn btn-secondary"
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => setPage((prev) => prev + 1)}
                    >
                        Next →
                    </button>
                </div>
            </div>
        </div>
    );
};

export default BlogList;
