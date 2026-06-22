from repositories.car_repository import (
    get_all_car_data,
    
)


def filter_car_data(brand, model):
    try:
        data1, data2, data3 = get_all_car_data(brand, model)
        return {
            "data1": data1,
            "data2": data2,
            "data3": data3,
        }
    except Exception as e:
        print("error:", str(e))
        return {
            "data1": [],
            "data2": [],
            "data3": [],
        }