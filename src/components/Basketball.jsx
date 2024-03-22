import React from 'react';

const Basketball = () => {
    return (
        <div>
            <div class="container my-5">
                <div class="row">
                    <div class="col-lg-6">
                        <img class="w-100 shadow" src="../assets/ser3.jpg" alt="..." />
                    </div>
                    <div class="col-lg-6">
                        <div class="p-5 mt-4">
                            <h1 class="display-4">Welcome To Learn Basketball</h1>
                            <p class="lead">Name : Loji</p>
                            <p class="lead">Type of Coach : Basketball</p>
                            <p class="lead">Experience : 05 years</p>
                            <p class="lead">Gender : Male</p>
                            <p class="lead">Address : Mallavi</p>
                            <a href="/service/basketball/bookingcoach" class="btn btn-outline-danger">Book Now</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Basketball;