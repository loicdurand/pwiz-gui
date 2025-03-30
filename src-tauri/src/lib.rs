mod model;
mod service;

use model::model::Post;
use service::service as Service;

// Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
#[tauri::command]
fn get_posts() -> Vec<Post> {
    Service::get_posts()
}

#[tauri::command]
fn insert_post(title: &str, content_type: &str, content: &str, tags:&str) -> String {
    println!("title: {}",title);
    println!("content: {}",content);
    println!("content_type: {}",content_type);
    println!("tags: {}",tags);

    String::from("ok")
}

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            get_posts,
            insert_post,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
