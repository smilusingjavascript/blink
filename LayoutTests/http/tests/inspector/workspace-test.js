var initialize_WorkspaceTest = function() {

InspectorTest.createWorkspace = function(ignoreEvents)
{
    WebInspector.settings.createSetting("fileSystemMapping", {}).set({});
    InspectorTest.testFileSystemMapping = new WebInspector.FileSystemMapping();
    InspectorTest.testFileSystemMapping._fileSystemMappingSetting = new InspectorTest.MockSetting({});
    InspectorTest.testFileSystemMapping._excludedFoldersSetting = new InspectorTest.MockSetting({});

    InspectorTest.testTargetManager = new WebInspector.TargetManager();
    InspectorTest.testWorkspace = new WebInspector.Workspace(InspectorTest.testFileSystemMapping);
    InspectorTest.testNetworkWorkspaceBinding = new WebInspector.NetworkWorkspaceBinding(InspectorTest.testWorkspace);
    InspectorTest.testDebuggerWorkspaceBinding = new WebInspector.DebuggerWorkspaceBinding(InspectorTest.testTargetManager, InspectorTest.testWorkspace, InspectorTest.testNetworkWorkspaceBinding);
    if (ignoreEvents)
        return;
    InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeAdded, InspectorTest._defaultWorkspaceEventHandler);
    InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeRemoved, InspectorTest._defaultWorkspaceEventHandler);
}

InspectorTest.waitForWorkspaceUISourceCodeAddedEvent = function(callback, count)
{
    InspectorTest.uiSourceCodeAddedEventsLeft = count || 1;
    InspectorTest.testWorkspace.removeEventListener(WebInspector.Workspace.Events.UISourceCodeAdded, InspectorTest._defaultWorkspaceEventHandler);
    InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeAdded, uiSourceCodeAdded);

    function uiSourceCodeAdded(event)
    {
        if (!(--InspectorTest.uiSourceCodeAddedEventsLeft)) {
            InspectorTest.testWorkspace.removeEventListener(WebInspector.Workspace.Events.UISourceCodeAdded, uiSourceCodeAdded);
            InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeAdded, InspectorTest._defaultWorkspaceEventHandler);
        }
        callback(event.data);
    }
}

InspectorTest.waitForWorkspaceUISourceCodeRemovedEvent = function(callback, count)
{
    InspectorTest.uiSourceCodeRemovedEventsLeft = count || 1;
    InspectorTest.testWorkspace.removeEventListener(WebInspector.Workspace.Events.UISourceCodeRemoved, InspectorTest._defaultWorkspaceEventHandler);
    InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeRemoved, uiSourceCodeAdded);

    function uiSourceCodeAdded(event)
    {
        if (!(--InspectorTest.uiSourceCodeRemovedEventsLeft)) {
            InspectorTest.testWorkspace.removeEventListener(WebInspector.Workspace.Events.UISourceCodeRemoved, uiSourceCodeAdded);
            InspectorTest.testWorkspace.addEventListener(WebInspector.Workspace.Events.UISourceCodeRemoved, InspectorTest._defaultWorkspaceEventHandler);
        }
        callback(event.data);
    }
}

InspectorTest.addMockUISourceCodeToWorkspace = function(url, type, content)
{
    var mockContentProvider = new WebInspector.StaticContentProvider(type, content);
    InspectorTest.testNetworkWorkspaceBinding.addFileForURL(url, mockContentProvider);
}

InspectorTest._defaultWorkspaceEventHandler = function(event)
{
    var uiSourceCode = event.data;
    if (uiSourceCode.project().type() === WebInspector.projectTypes.Debugger && !uiSourceCode.url)
        return;
    throw new Error("Unexpected Workspace event: " + event.type + ": " + uiSourceCode.uri() + ".");
}

InspectorTest.uiSourceCodeURL = function(uiSourceCode)
{
    return uiSourceCode.originURL().replace(/.*LayoutTests/, "LayoutTests");
}

InspectorTest.dumpUISourceCode = function(uiSourceCode, callback)
{
    InspectorTest.addResult("UISourceCode: " + InspectorTest.uiSourceCodeURL(uiSourceCode));
    if (uiSourceCode.contentType() === WebInspector.resourceTypes.Script || uiSourceCode.contentType() === WebInspector.resourceTypes.Document)
        InspectorTest.addResult("UISourceCode is content script: " + (uiSourceCode.project().type() === WebInspector.projectTypes.ContentScripts));
    uiSourceCode.requestContent(didRequestContent);

    function didRequestContent(content, contentEncoded)
    {
        InspectorTest.addResult("Highlighter type: " + WebInspector.SourcesView.uiSourceCodeHighlighterType(uiSourceCode));
        InspectorTest.addResult("UISourceCode content: " + content);
        callback();
    }
}

};
