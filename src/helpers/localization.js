"use strict";

const Msg = {
    
    // Authentication
    INVALID_EMAIL: "Please enter a valid email address.",
    INVALID_PASSWORD: "Invalid password. Please try again.",
    INVALID_MOBILE_NUMBER: "Mobile number must be between 10 to 12 digits.",
    INVALID_CREDENTIALS: "Invalid credentials. Please check your email and password.",
    INVALID_USER_ID: "Invalid user ID.",
    PASSWORD_INCORRECT: "Password must be at least 6 characters long.",
    CURRENT_PASSWORD_REQUIRED: "Please enter your current password.",
    EMAIL_REQUIRED: "Email address is required.",
    PASSWORD_REQUIRED: "Password is required.",
    USERNAME_REQUIRED: "Username is required.",
    PASSWORD_IS_ALPHANUMERIC: "Password must contain only letters and numbers.",
    REQUIRED_UPPERCASE: "Password must contain at least one uppercase letter.",
    INVALID_PASSWORD_LENGTH: "Password must be between 6 and 12 characters.",

    // UserController
    TYPE_REQUIRED: "Type is required.",
    FIRST_NAME_REQUIRED: "First name is required.",
    LAST_NAME_REQUIRED: "Last name is required.",
    MOBILE_NUMBER_REQUIRED: "Mobile number is required.",
    INVALID_INPUT: "The input must be numeric.",
    DATE_OF_BIRTH_REQUIRED: "Date of birth is required.",
    INVALID_DATE_FORMAT: "Invalid date format. Please use 'DD-MM-YYYY'.",
    INVALID_GENDER: "Gender must be 'Male', 'Female', or 'Other'.",
    USER_ID_REQUIRED: "User ID is required.",
    USER_NOT_FOUND: "User not found.",
    USER_EXISTS: "User already exists.",
    EMAIL_EXIST: "Email address already exists.",
    EMAIL_SEND_ERROR: "There was an error sending the email. Please try again later.",
    PASSWORD_RESET_SUCCESS: "Your password has been successfully reset.",
    USER_REGISTER: "User registered successfully.",
    USER_LOGIN: "Login successful.",
    USER_PROFILE_UPDATE: "Profile updated successfully.",
    USER_ACCOUNT_DELETE: "User account deleted successfully.",
    PASSWORD_NOT_MATCH: "Passwords do not match.",
    PASSWORD_UPDATE: "Password updated successfully.",
    USER_PROFILE_DELETE: "User profile deleted successfully.",

    // AddressController
    APARTMENT_NAME_REQUIRED: "Apartment name is required.",
    STREET_NO_REQUIRED: "Street number is required.",
    CITY_REQUIRED: "City is required.",
    STATE_REQUIRED: "State is required.",
    ZIP_CODE_REQUIRED: "Zip code is required.",
    COUNTRY_REQUIRED: "Country is required.",
    USER_ADDRESS_NOT_FOUND: "Address not found.",
    INVALID_ADDRESS_ID: "Invalid address ID.",
    USER_ADDRESS_CREATED: "Address added successfully.",
    USER_ADDRESS_UPDATED: "Address updated successfully.",
    USER_ADDRESS_DELETED: "Address deleted successfully.",

    // CategoryController
    CATEGORY_NAME_REQUIRED: "Category name is required.",
    CATEGORY_EXISTS: "Category name already exists.",
    INVALID_CATEGORY_ID: "Invalid category ID.",
    CATEGORY_NOT_FOUND: "Category not found.",
    CATEGORY_CREATED: "Category created successfully.",
    CATEGORY_UPDATED: "Category updated successfully.",
    CATEGORY_DELETED: "Category deleted successfully.",

    // SubCategoryController
    SUB_CATEGORY_NAME_REQUIRED: "Subcategory name is required.",
    SUB_CATEGORY_EXISTS: "Sub category name already exists.",
    CATEGORY_ID_REQUIRED: "Category ID is required.",
    SUB_CATEGORY_ID_REQUIRED: "Subcategory ID is required.",
    SUB_CATEGORY_EXISTS: "Subcategory name already exists.",
    INVALID_SUB_CATEGORY_ID: "Invalid subcategory ID.",
    SUB_CATEGORY_NOT_FOUND: "Subcategory not found.",
    SUB_CATEGORY_CREATED: "Subcategory created successfully.",
    SUB_CATEGORY_UPDATED: "Subcategory updated successfully.",
    SUB_CATEGORY_DELETED: "Subcategory deleted successfully.",

    // BrandController
    BRAND_NAME_REQUIRED: "Brand name is required.",
    IMAGE_IS_REQUIRED: "Image is required.",
    INVALID_IMAGE_TYPE: "Invalid image type",
    INVALID_BRAND_ID: "Invalid brand ID.",
    BRAND_NOT_FOUND: "Brand not found.",
    IMAGE_DELETE_ERROR: "Failed to delete the image. Please try again later.",
    BRAND_EXISTS: "Brand name already exists.",
    BRAND_CREATED: "Brand added successfully.",
    BRAND_UPDATED: "Brand updated successfully.",
    BRAND_DELETED: "Brand deleted successfully.",

    // ProductController
    PRODUCT_NAME_REQUIRED: "Product name is required.",
    BRAND_ID_REQUIRED: "Brand ID is required.",
    CATEGORY_ID_REQUIRED: "Category ID is required.",
    PRODUCT_PRICE_REQUIRED: "Product price must be a positive number.",
    PRODUCT_DESCRIPTION_REQUIRED: "Product description is required.",
    PRODUCT_IMAGE_REQUIRED: "Product image is required.",
    PRODUCT_SIZE_REQUIRED: "Product size is required.",
    PRODUCT_COLOR_REQUIRED: "Product color is required.",
    PRODUCT_STOCK_REQUIRED: "Product stock must be a positive integer.",
    PRODUCT_ID_REQUIRED: "Product ID is required.",
    PRODUCT_EXISTS: "Product already exists.",
    PRODUCT_NOT_FOUND: "Product not found.",
    INSUFFICIENT_STOCK: "The requested quantity for this product is not available",
    INVALID_PRODUCT_ID: "Invalid product ID.",
    PRODUCT_CREATED: "Product added successfully.",
    PRODUCT_UPDATED: "Product updated successfully.",
    PRODUCT_DELETED: "Product deleted successfully.",

    // Token
    TOKEN_REQUIRED: "Token is required.",
    INVALID_TOKEN: "Invalid token.",
    USER_NOT_EXIST: "User not found. Please remove the old token and try again.",
    TOKEN_EXPIRED: "Token has expired.",
    UNAUTHORIZED_ACCESS: "Unauthorized access.",

    // General
    INVALID_REQUEST: "Invalid request.",
    SUCCESS: "Success.",
    DATA_SAVED: "Data saved successfully.",
    DATA_DELETED: "Data deleted successfully.",
    SERVER_ERROR: "Internal server error.",
};

module.exports = Msg;