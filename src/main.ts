import { category, risk } from "./constants";
import data from "./data.json";

interface IBMIData {
    Gender: string;
    HeightCm: number;
    WeightKg: number;
}

/**
 * BMI Calculator class
 */
export class BMICalculator {
    constructor() {}

    /**
     * method to convert cms to m
     * @param cms - height in CMS
     * @returns height in metre
     */
    private convertToMeter(cms: number): number {
        return cms / 100;
    }

    /**
     * Method to calculate the Body mass index
     * @param height height of the person in cms
     * @param weight weight of the person in kgs
     * @returns BMI in float value
     */
    private getBodyMassIndex(height: number, weight: number): string {
        const heightM = this.convertToMeter(height);
        const bmi = weight / (heightM * heightM);
        return bmi.toFixed(1);
    }

    /**
     * Get the report result
     * @param bmi bmi of the person
     * @param type "category" or "risk", what type of report is needed
     * @returns report for the type provided
     */
    private report(bmi: number, type: string): string {
        if (bmi < 18.5) {
            return type === "risk" ? risk.MALNUTRITION : category.UNDERWEIGHT;
        } else if (bmi >= 18.5 && bmi < 25) {
            return type === "risk" ? risk.LOW_RISK : category.NORMAL;
        } else if (bmi >= 25 && bmi < 30) {
            return type === "risk" ? risk.ENHANCED_RISK : category.OVERWEIGHT;
        } else if (bmi >= 30 && bmi < 35) {
            return type === "risk" ? risk.MEDIUM_RISK : category.MODERATE;
        } else if (bmi >= 35 && bmi < 40) {
            return type === "risk" ? risk.HIGH : category.SEVERE;
        } else {
            return type === "risk" ? risk.VERY_HIGH : category.VERY_SEVERE;
        }
    }

    /**
     * Main function that calcualtes and generates the BMI report
     * @param record input record to calculate BMI
     * @returns logs the report in table format
     */
    public calculateBMI(record: IBMIData[]) {
        return record.map((data) => {
            const BMI = this.getBodyMassIndex(data.HeightCm, data.WeightKg);
            const BMICategory = this.report(Number(BMI), "category");
            const healthRisk = this.report(Number(BMI), "risk");
            return {
                BMI,
                "BMI Category": BMICategory,
                "Health Risk": healthRisk,
            };
        });
    }
}

const calculator = new BMICalculator();
const result = calculator.calculateBMI(data);
const Overweight = result.filter((x) => x["BMI Category"] === "Overweight");

// Print the report in table format
console.table(result);

// Print the count of overweight persons
console.log("No. of Overweight persons: ", Overweight.length);
