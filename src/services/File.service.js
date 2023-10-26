import http from "../conf-http";

class FileService {
    uploadFile(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/pengajuan", data, config);
    }

    listFile(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/listfile", data, config);
    }

    getFile(data, token) {
        var config = {
            headers: {
                "x-access-token": token
            }
        }
        return http.post("upload/getfile", data, config);
    }
}

export default new FileService();