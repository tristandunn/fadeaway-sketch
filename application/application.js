class Fadeaway {
  static open(path) {
    let task      = NSTask.alloc().init(),
        pipe      = NSPipe.pipe(),
        command   = NSString.stringWithFormat("\\open /Applications/Fadeaway.app --args \"%@\"", path),
        errorPipe = NSPipe.pipe();

    try {
      task.setLaunchPath("/bin/bash");
      task.setArguments(NSArray.arrayWithObjects("-c", command, null));
      task.setStandardOutput(pipe);
      task.setStandardError(errorPipe);
      task.launch();

      let data = errorPipe.fileHandleForReading().readDataToEndOfFile();

      if (data !== null && data.length()) {
        let message = NSString.alloc().initWithData_encoding(data, NSUTF8StringEncoding);

        NSException.raise_format("failed", message);
      } else {
        pipe.fileHandleForReading().readDataToEndOfFile();
      }
    } catch (error) {
      NSApplication.sharedApplication().displayDialog_withTitle(error, "Failed.");
    }
  }

  static openArtboard(context) {
    let document = context.document,
        artboard = document.findCurrentArtboardGroup();

    if (!artboard) {
      artboard = document.currentPage().artboards()[0];
    }

    if (artboard) {
      Fadeaway.saveAndOpen(document, artboard);
    } else {
      document.showMessage("No artboard found.");
    }
  }

  static openSlice(context) {
    let document = context.document,
        slice    = Fadeaway.findSlice(document);

    if (slice) {
      Fadeaway.saveAndOpen(document, slice);
    } else {
      document.showMessage("No slice found.");
    }
  }

  static findSlice(document) {
    let filter = NSPredicate.predicateWithFormat("SELF isKindOfClass:%@", MSSliceLayer),
        slices = document.currentPage().exportableLayers().filteredArrayUsingPredicate(filter);

    for (let index = 0; index < slices.length(); index++) {
      let layer = slices[index];

      if (layer.isSelected()) {
        return layer;
      }
    }

    return slices[0];
  }

  static saveAndOpen(document, layer) {
    let filename = File.getTemporaryFilename();

    document.saveArtboardOrSlice_toFile(layer, filename);

    Fadeaway.open(filename);
  }
}

class File {
  static getTemporaryFilename() {
    let filename = NSString.stringWithFormat("%@.png", NSProcessInfo.processInfo().globallyUniqueString()),
        url      = NSURL.fileURLWithPath(NSTemporaryDirectory().stringByAppendingPathComponent(filename));

    return url.path();
  }
}

Sketch.openArtboard = Fadeaway.openArtboard;
Sketch.openSlice    = Fadeaway.openSlice;
