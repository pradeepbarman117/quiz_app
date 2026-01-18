class ApiResponse {
    constructor(statusCode, data, message = "Success") {
        this.statusCode = statusCode;
        this.data = data;
        this.message = message;
        this.success = statusCode < 400;
    }

    static success(res, data = null, message = "Success", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            statusCode,
            message,
            data
        });
    }

    static created(res, data = null, message = "Created successfully") {
        return res.status(201).json({
            success: true,
            statusCode: 201,
            message,
            data
        });
    }

    static paginated(res, data, pagination, message = "Success") {
        return res.status(200).json({
            success: true,
            statusCode: 200,
            message,
            data,
            pagination
        });
    }
}

module.exports = ApiResponse;