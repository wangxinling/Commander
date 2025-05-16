# About this Demo

This demo is for practicing CodeIgniter and Backbone personally, and for trying to implement a Web AI using WebLLM/ONNX. The demo aims to provide a function-calling commander based on a function schema uploaded by the user. The basic architecture of this system consists of a RESTful backend and a Backbone-powered frontend, as shown in the diagram below.

```mermaid
flowchart TB
 subgraph B["Backbone JS"]
        Models["Model&Collection"]
        Views["Views"]
  end
 subgraph Frontend["Frontend"]
        A["WebLLM"]
        B
  end
 subgraph D["Codeigniter"]
        Model["Model"]
        Controller["Controller"]
        Routes["Routes"]
  end
 subgraph Backend["Backend"]
        C["RESTful APIs"]
        D
  end
 subgraph Database["Database"]
        E[["`MySQL`"]]
  end
    Views --> Models
    Routes --> Controller
    Controller --> Model
    A --> B
    B -- User Request --> C
    C --> D
    D --> E

```

Both CodeIgniter and Backbone follow the MVC pattern. However, in my demo, a full implementation of MVC isn't necessary. For example, I built the site as a single-page application, so the View layer on the backend doesn't have any real functionality. Additionally, since Backbone lacks a default controller layer, I plan to customize and extend it later. The controller layer allows the logic to be divided into smaller, more maintainable modules.

The current stage of my demo involves storing chat histories in the database. It doesn't yet include the user system and sessions. Additionally, function calling is a significant challenge, involving the AI Agent framework, embeddings, and Retrieval-Augmented Generation (RAG). I tried using ONNX, an AI model format and runtime created by Microsoft. However, it ran pretty slowly when executing RAG in a web browser. I switched to WebLLM because it supports a very fast RAG model called Snowflake.

# Development Environment

```mermaid
flowchart TB
    Frontend("Frontend") --> NodeJS("<i class="fa-brands fa-docker"></i> NodeJS Container")
    NodeJS -- Development Evironment --> Webpack("Webpack")
    Webpack --> WebLLM("WebLLM") & Backbone("Backbone")
    WebLLM -- Build --> HTML("HTML+JS")
    Backbone -- Build --> HTML
    Backend("Backend") --> PHP("<i class="fa-brands fa-docker"></i> PHP Container")
    PHP -- Development Evironment --> CodeIgniter("CodeIgniter")
    CodeIgniter --> Public("Public Pages") & DM("Database Migration")
    Public <--> HTML
    Database("Database") --> MySQL("<i class="fa-brands fa-docker"></i> MySQL Container") & PHPAdmin("<i class="fa-brands fa-docker"></i> PHPAdmin Container")
    MySQL ----> Histories("Histories")
    DM --> Histories

    style NodeJS fill:#2962FF
    style HTML fill:#FFD600
    style PHP fill:#2962FF
    style MySQL fill:#2962FF
    style PHPAdmin fill:#2962FF

```


