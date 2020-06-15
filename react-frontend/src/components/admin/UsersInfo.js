import React from 'react'

const UsersInfo = () => {
    return (
        <div className="container layout-dashboard" style={{ backgroundColor: "#1C8EF9" }}>
            <table class="table table-light table-bordered thead-dark">
                <thead>
                    <tr>
                        <th scope="col">#</th>
                        <th scope="col">Usuario</th>
                        <th scope="col">Cantidad de listas</th>
                        <th scope="col">Cantidad de países (totales)</th>
                        <th scope="col">Último acceso</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <th scope="row">1</th>
                        <td>bart@simpson.com</td>
                        <td>3</td>
                        <td>12</td>
                        <td>Mon May 25 2020 21:58:02 GMT-0300 </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>lisa@simpson.com</td>
                        <td>2</td>
                        <td>8</td>
                        <td>Sun May 24 2020 21:58:02 GMT-0300</td>
                    </tr>
                    <tr>
                        <th scope="row">3</th>
                        <td>homero@.com</td>
                        <td>5</td>
                        <td>30</td>
                        <td>Sun May 24 2020 21:58:02 GMT-0300</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default UsersInfo;
