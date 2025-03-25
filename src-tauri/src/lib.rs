mod model;
mod service;

use model::model::Post;
use service::service as Service;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

#[tauri::command]
fn get_posts() -> Vec<Post> {
    Service::get_posts()
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            greet,
            get_posts
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
