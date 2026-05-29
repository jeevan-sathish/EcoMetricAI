from repositories.car_repository import (
    get_selected_car,
    get_lowest_emission_cars,
    get_best_car
)


def filter_car_data(brand, model):

    data1 = get_selected_car(brand, model)

    data2 = get_lowest_emission_cars(brand)

    data3 = get_best_car(brand)

    return {
        "data1": data1,
        "data2": data2,
        "data3": data3
    }