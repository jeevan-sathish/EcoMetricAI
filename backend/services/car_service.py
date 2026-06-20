
from repositories.car_repository import (
    get_selected_car,
    get_lowest_emission_cars,
    get_best_car,
    get_AI_suggestions
)


def filter_car_data(brand, model):

    try:
        print("step1")
        data1 = get_selected_car(brand, model)
        
        print("step2")
        
        data2 = get_lowest_emission_cars(brand)
        print("step3")
        data3 = get_best_car(brand)
        print("step4")
        ai_response = get_AI_suggestions(brand, model)

        return {
            
            "data1": data1,
            "data2": data2,
            "data3": data3,
            "suggestion": ai_response,
        }

    except Exception as e:
        print("error:", str(e))

        return {
            "suggestion": "Server error",
            "data1": [],
            "data2": [],
            "data3": [],
        }
        
        
    